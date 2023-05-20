import { expect, test } from '@playwright/test'

test('keyjump-test-1', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByTitle('一系列测试').click()
  await page.getByRole('button', { name: '选 择' }).click()
  await page.getByText('Array[5]').click()
  await page.locator('#rc_select_1').press('ArrowDown')
  await page.locator('#rc_select_1').press('ArrowDown')
  await page.locator('#rc_select_1').press('Enter')
  await page.locator('#rc_select_1').press('ArrowRight')
  await page.locator('#rc_select_2').press('Enter')
  await page.locator('#rc_select_2').press('ArrowDown')
  await page.locator('#rc_select_2').press('ArrowDown')
  await page.locator('#rc_select_2').press('Enter')
  await page.locator('#rc_select_2').press('ArrowRight')

  await expect(page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').first()).toBeFocused()
  await expect(page.locator('[id="window\\:\\/enumValue"]').getByText('false')).toHaveText('false')
  await expect(page.locator('[id="window\\:\\/smellyAndLong"]').getByText('114514')).toHaveText('114514')
})

test('keyjump-test-2', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByTitle('一系列测试').click()
  await page.getByRole('button', { name: '选 择' }).click()
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').first().click()
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').first().press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').nth(1).press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').nth(1).press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').nth(2).press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest"]').getByRole('spinbutton').nth(2).press('ArrowRight')
  await page.getByRole('textbox', { name: 'balabala' }).press('ArrowRight')
  await page.getByRole('textbox', { name: 'balabala' }).press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowDown')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowDown')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowDown')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowDown')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowDown')
  await page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton').press('ArrowRight')
  await page.getByRole('textbox', { name: 'pattern567' }).press('ArrowRight')
  await page.getByRole('textbox', { name: 'pattern567' }).press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest\\/pattern567"]').getByRole('spinbutton').press('ArrowRight')
  await page.locator('[id="window\\:\\/newNameTest\\/pattern567"]').getByRole('spinbutton').press('ArrowRight')
  await page.locator('#rc_select_16').press('ArrowRight')

  await expect(page.locator('[id="window\\:\\/newNameTest\\/balabala"]').getByRole('spinbutton')).toHaveValue('95')
  await expect(page.locator('#rc_select_3')).toBeFocused()
})

test('keyjump-test-3', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByTitle('一系列测试').click()
  await page.getByRole('button', { name: '选 择' }).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('button', { name: 'plus Item' }).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).fill('#')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).press('CapsLock')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).fill('#ff0000')
  await page.locator('[id="window\\:\\/mess"]').getByRole('button', { name: 'plus Item' }).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).fill('#00ffff')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first().click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first().press('ArrowRight')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1).press('ArrowRight')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1).press('ArrowRight')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).press('ArrowRight')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).press('ArrowRight')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3).press('ArrowRight')

  await expect(page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(3)).toBeFocused()

  await page.locator('[id="window\\:\\/mess"]').getByRole('button', { name: 'ellipsis' }).nth(1).click()
  await page.getByText('delete').click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).click()
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).press('ArrowUp')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2).press('ArrowLeft')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1).press('ArrowLeft')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1).press('ArrowLeft')
  await page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first().press('ArrowLeft')

  await expect(page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first()).toBeFocused()
  await expect(page.locator('[id="window\\:\\/mess"]').getByRole('textbox').first()).toHaveValue('#0055ff')
  await expect(page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(1)).toHaveValue('#ff0000')
  await expect(page.locator('[id="window\\:\\/mess"]').getByRole('textbox').nth(2)).toHaveValue('#00ffff')
})

test('keyjump-test-4', async ({ page }) => {
  await page.goto('http://localhost:8000/#/~demos/packages-docs-src-json-schema-editor-demo-app')
  await page.getByRole('button', { name: '加载示例' }).click()
  await page.getByRole('dialog', { name: '选择示例' }).getByText('string').click()
  await page.getByTitle('一系列测试').click()
  await page.getByRole('button', { name: '选 择' }).click()
  await page.getByRole('button', { name: 'plus Property' }).nth(2).click()
  await page.locator('#rc_select_16').press('ArrowRight')
  await page.locator('#rc_select_8').press('ArrowRight')
  await page
    .getByRole('button', { name: 'right oneOf套娃 3 类型为对象 arrow-up arrow-down delete' })
    .getByRole('button', { name: 'arrow-up' })
    .press('ArrowRight')
  await page
    .getByRole('button', { name: 'right oneOf套娃 3 类型为对象 arrow-up arrow-down delete' })
    .getByRole('button', { name: 'arrow-down' })
    .press('ArrowRight')
  await page
    .getByRole('button', { name: 'right oneOf套娃 3 类型为对象 arrow-up arrow-down delete' })
    .getByRole('button', { name: 'delete' })
    .press('ArrowRight')

  await expect(page.locator('#rc_select_9')).toBeFocused()

  await page.locator('#rc_select_9').press('ArrowRight')
  await page.locator('#rc_select_17').press('ArrowDown')
  await page.locator('#rc_select_10').press('ArrowRight')
  await page
    .getByRole('button', { name: 'right oneOf套娃 4 类型为其它 arrow-up arrow-down delete' })
    .getByRole('button', { name: 'arrow-up' })
    .press('ArrowRight')
  await page
    .getByRole('button', { name: 'right oneOf套娃 4 类型为其它 arrow-up arrow-down delete' })
    .getByRole('button', { name: 'delete' })
    .press('ArrowRight')
  await page.locator('#rc_select_11').press('ArrowRight')
  await page.locator('#rc_select_18').press('ArrowDown')
  await page.locator('[id="window\\:\\/oneOfLayers"] input[type="text"]').nth(4).press('ArrowDown')
  await page.locator('[id="window\\:\\/oneOfLayers"] input[type="text"]').nth(4).press('ArrowDown')
  await page.locator('div:nth-child(5) > .ant-btn').first().press('ArrowRight')
  await page.locator('[id="window\\:\\/oneOfLayers"]').getByPlaceholder('Select date').press('ArrowRight')
  await page.locator('#rc_select_13').press('ArrowRight')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/6"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div:nth-child(3) > .ant-btn'
    )
    .press('ArrowRight')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/6"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div:nth-child(4) > .ant-btn'
    )
    .press('ArrowRight')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/6"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div:nth-child(5) > .ant-btn'
    )
    .press('ArrowRight')
  await page.locator('#rc_select_14').press('ArrowRight')
  await page.locator('#rc_select_15').press('ArrowRight')
  await page.getByRole('button', { name: 'retweet' }).press('ArrowRight')
  await page
    .locator(
      '[id="window\\:\\/oneOfLayers\\/7"] > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra > .ant-space > div:nth-child(5) > .ant-btn'
    )
    .press('ArrowRight')
  await page.locator('div:nth-child(6) > .ant-btn').press('ArrowRight')

  await expect(page.getByRole('button', { name: 'plus Item' }).nth(2)).toBeFocused()
})
