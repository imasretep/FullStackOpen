const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const blogWithMostLikes = (blogs) => {
    let mostLikes = 0
    let  blog = {}
    for (let i = 0; i < blogs.length; i++) {
        if(blogs[i].likes > mostLikes){
            mostLikes = blogs[i].likes
            blog = blogs[i]
        }
    }
    return blog
}

module.exports = {
 dummy,
 totalLikes,
 blogWithMostLikes
}