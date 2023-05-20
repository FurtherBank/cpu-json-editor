import { expect, test } from '@playwright/test'

test('string', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('')
  await page.getByRole('textbox').press('CapsLock')
  await page.getByRole('textbox').fill('I')
  await page.getByRole('textbox').press('CapsLock')
  await page.getByRole('textbox').fill("I'm the most handsome!")
  await page.getByRole('textbox').press('Enter')
  await page.getByRole('button', { name: 'undo' }).click()

  // 这里必须加 await，不然因为 promise 竟时问题会导致最后的测试不过
  await expect(page.getByRole('textbox')).toHaveValue('A basic string')

  await page.getByRole('button', { name: 'redo' }).click()

  await expect(page.getByRole('textbox')).toHaveValue("I'm the most handsome!")
})
