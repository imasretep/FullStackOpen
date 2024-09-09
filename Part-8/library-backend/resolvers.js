const Author = require("./models/Author");
const Book = require("./models/Book");
const { GraphQLError } = require("graphql");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filters.author = author._id;
        }
      }

      if (args.genre) {
        filters.genres = args.genre;
      }

      return Book.find(filters).populate("author");
    },
    allAuthors: async (root, args) => {
      return Author.find({});
    },
    me: (root, args, context) => {
      console.log("Me:", context.currentUser);
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (author) => {
      const count = await Book.countDocuments({ author: author._id });
      return count;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not athenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        if (args.author.length < 4) {
          throw new GraphQLError(
            "Author name must be atleast 4 characters long",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
              },
            },
          );
        }

        author = new Author({
          name: args.author,
          born: null,
        });

        await author.save();
      }

      const book = new Book({
        ...args,
        author: author._id,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(
          "Saving book failed, title must be atleast 5 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          },
        );
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
      return book.populate("author");
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not athenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      try {
        author.born = args.setBornTo;
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing date of birth failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(
          "Creating a new user has failed. Ensure all required fields, username and favorite genre, are provided",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
              error,
            },
          },
        );
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong username or password", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = { resolvers };
