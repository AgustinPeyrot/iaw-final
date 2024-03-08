const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Testing Form', () => {
    test('Creacción de 10 tareas', async ({ page }) => {
        const prioridades = ['Baja', 'Media', 'Alta'];
        
        for (let i = 1; i <= 10; i++) {
            await page.getByLabel('titulo').fill(`Tarea ${i}`);
            await page.getByLabel('descripcion').fill(`Esta es la Tarea ${i} creada a partir de un test de Playwright`);
            
            const indicePrioridad = Math.floor(Math.random() * prioridades.length);
            const prioridadAleatoria = prioridades[indicePrioridad];
            await page.selectOption('[id="prioridad"]', { label: prioridadAleatoria });

            await page.click('[id="fechaVencimiento"]');
            await page.fill('[class="react-datepicker__input-container"] > input', '03/03/2024');

            await page.getByLabel('Fecha de vencimiento').click();
            await page.getByLabel('Next Month').click();
            await page.getByLabel('Choose viernes, 19 de abril de').click();

            await page.getByRole('button', { name: 'Crear Tarea' }).click();

            await page.waitForTimeout(1500); //para esperar un poco entre tarea y tarea
        }
    })
})

test('Resolver todas las tareas', async ({ page }) => {
    let tasksResolved = true;
  
    while (tasksResolved) {
        //siempre resuelve la primera
        try {
            await page.waitForSelector('.card-body > .btn', { timeout: 5000 });
            await page.locator('.card-body > .btn').first().click();
        } catch (error) {
            //sino se encuentra tarea corta
            tasksResolved = false;
        }
    }
});

test('Pongo todas las tareas en estado "En curso"', async ({ page }) => {
    
    //espera que las tarjetas estén disponibles en la página
    await page.waitForSelector('div.mb-3.col');

    const cardCount = await page.$$eval('div.mb-3.col', divs => divs.length);
    console.log('Número de tarjetas:', cardCount);
    
    for (let i = 0; i < cardCount; i++) {
        await page.locator(`div.mb-3.col:nth-child(${i + 1}) > .mb-3 > .card-body > p:nth-child(2) > span > .form-control`).selectOption('En curso');
        await page.waitForTimeout(300); //con este tiempo de espera soluciono que no se saltee alguna tarea a veces
    }
});

test('Asignar estados aleatorios a las tareas', async ({ page }) => {
    await page.waitForSelector('div.mb-3.col');

    const cardCount = await page.$$eval('div.mb-3.col', divs => divs.length);
    console.log('Número de tarjetas:', cardCount);
    
    const estados = ['Completada', 'En curso', 'Nueva'];

    for (let i = 0; i < cardCount; i++) {
        const randomIndex = Math.floor(Math.random() * estados.length);
        const estadoSeleccionado = estados[randomIndex];
        
        await page.locator(`div.mb-3.col:nth-child(${i + 1}) > .mb-3 > .card-body > p:nth-child(2) > span > .form-control`).selectOption(estadoSeleccionado);
        await page.waitForTimeout(300);
    }
});
