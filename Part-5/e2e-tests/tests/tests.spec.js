const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, newBlog } = require('./test_helper')

describe('Blog tests', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'tester',
        password: 'testerspassword'
      }
      
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'tester', 'testerspassword')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'tester', 'password')
      await expect(page.getByText('Username or password is wrong')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
     await login(page, 'tester', 'testerspassword')
     await newBlog(page)
    })

    test('user can create a new blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click() 
      await expect(page.getByText('Author: Test User')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click() 
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('user can delete a blog if the user created it', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click() 
      await page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await page.waitForTimeout(5000)
      await expect(page.getByText('Made with Playwright')).not.toBeVisible()
    })

    test('no remove button is shown to user who did not create the blog', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await request.post('/api/users', {
        data: {
          name: 'Test User 2',
          username: 'tester2',
          password: 'testerspassword'
        }        
      })

      await login(page, 'tester2', 'testerspassword')
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('Blogs sorted by likes', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click() 
      await page.getByTestId('title').fill('Made with Playwright 2')
      await page.getByTestId('author').fill('Test User')
      await page.getByTestId('url').fill('local')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByText('Made with Playwright 2').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByText('Made with Playwright 2').getByRole('button', { name: 'hide' }).click()

      await expect(page.getByTestId('blogs').locator('div').first()).toContainText('Made with Playwright 2')
    })
  })
})