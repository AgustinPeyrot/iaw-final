const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

test.describe('Testing Form',()=> {
    
    test('formulario completado correctamente', async({ page }) => {
        await page.getByLabel('titulo').fill('Tarea test');
        await page.getByLabel('descripcion').fill('Esta es una tarea creada a partir de un test de Playwright');
        await page.selectOption('[id="prioridad"]', { label: 'Baja' });
        await page.click('[id="fechaVencimiento"]');
        await page.fill('[class="react-datepicker__input-container"] > input', '03/03/2024');
        
        await page.getByLabel('Prioridad').selectOption('Baja');
        await page.getByLabel('Fecha de vencimiento').click();
        await page.getByLabel('Next Month').click();
        await page.getByLabel('Choose viernes, 19 de abril de').click();

        await page.getByRole('button', { name: 'Crear Tarea' }).click();
    })
})