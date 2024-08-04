const login = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click() 
}

const newBlog = async (page) => {
  await page.getByRole('button', { name: 'new blog' }).click() 
  await page.getByTestId('title').fill('Made with Playwright')
  await page.getByTestId('author').fill('Test User')
  await page.getByTestId('url').fill('local')
  await page.getByRole('button', { name: 'create' }).click()
}

export { login, newBlog }