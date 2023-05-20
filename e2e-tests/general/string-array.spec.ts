import { expect, test } from '@playwright/test'

test('string-array', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByTitle('string[]').click()
  await page.getByRole('button', { name: '选 择' }).click()
  await page.locator('[id="window\\:\\/1"]').getByRole('textbox').click()
  await page.locator('[id="window\\:\\/1"]').getByRole('textbox').press('Control+a')
  await page.locator('[id="window\\:\\/1"]').getByRole('textbox').fill('我是这个世界上最帅的帅哥！')
  await page.locator('[id="window\\:\\/1"]').getByRole('button', { name: 'arrow-down' }).click()

  await expect(page.locator('[id="window\\:\\/1"]').getByRole('textbox')).toHaveValue(
    '我可以回答很多种类的问题，例如问题可能涉及历史、科学、政治、娱乐等领域。'
  )
  await expect(page.locator('[id="window\\:\\/2"]').getByRole('textbox')).toHaveValue('我是这个世界上最帅的帅哥！')

  await page.locator('[id="window\\:\\/2"]').getByRole('button', { name: 'arrow-down' }).click()

  await expect(page.locator('[id="window\\:\\/2"]').getByRole('textbox')).toHaveValue(
    '我是由 OpenAI 训练而来，并且我的知识涵盖了截止到 2021 年的信息。'
  )
  await expect(page.locator('[id="window\\:\\/3"]').getByRole('textbox')).toHaveValue('我是这个世界上最帅的帅哥！')

  await page.locator('[id="window\\:\\/2"]').getByRole('button', { name: 'delete' }).click()

  await expect(page.locator('[id="window\\:\\/1"]').getByRole('textbox')).toHaveValue(
    '我可以回答很多种类的问题，例如问题可能涉及历史、科学、政治、娱乐等领域。'
  )
  await expect(page.locator('[id="window\\:\\/2"]').getByRole('textbox')).toHaveValue('我是这个世界上最帅的帅哥！')
})
