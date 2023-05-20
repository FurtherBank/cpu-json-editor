import { expect, test } from '@playwright/test'

test('clear errors', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByText('一系列测试').click()
  await page.getByRole('button', { name: '选 择' }).click()

  expect(await page.getByRole('img', { name: 'close-circle' }).locator('svg').count()).toBe(5)

  await page.locator('[id="window\\:\\/typeError"]').getByRole('button', { name: 'ellipsis' }).click()
  await page.getByRole('menuitem', { name: 'reset' }).click()
  await page.locator('[id="window\\:\\/typeError"]').getByRole('textbox').click()
  await page.locator('[id="window\\:\\/typeError"]').getByRole('textbox').fill('not type error')
  await page.locator('[id="window\\:\\/typeError"]').getByRole('textbox').press('Enter')

  expect(await page.getByRole('img', { name: 'close-circle' }).locator('svg').count()).toBe(4)

  await page.locator('[id="window\\:\\/constValue"]').getByRole('button', { name: 'ellipsis' }).click()
  await page.getByText('detail').click()
  await page
    .getByRole('button', { name: 'right close-circle constValue object retweet' })
    .getByRole('button', { name: 'retweet' })
    .click()
  await page.getByRole('dialog').getByTitle('null').click()
  await page.getByTitle('number', { exact: true }).getByText('number').click()
  await page.getByRole('dialog').getByRole('spinbutton').click()
  await page.getByRole('dialog').getByRole('spinbutton').fill('123')
  await page.getByRole('dialog').getByRole('spinbutton').press('Enter')
  await page.getByRole('button', { name: 'Close' }).click()
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').click()
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').fill('49')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('Enter')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first().click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1).fill('#9955ff')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first().press('Enter')
  await page.getByRole('button', { name: 'retweet' }).click()
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div:nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item'
    )
    .click()
  await page.getByRole('tree').getByTitle('date').click()
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div > .ant-input'
    )
    .click()
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div > .ant-input'
    )
    .fill('2020-01-02')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div > .ant-input'
    )
    .press('Enter')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div > .ant-picker > .ant-picker-input'
    )
    .click()
  await page.getByRole('row', { name: '26 27 28 29 30 31 1' }).getByText('29').click()

  expect(await page.getByRole('img', { name: 'close-circle' }).locator('svg').count()).toBe(0)
})
