const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    //si no se quiere correr local se puede correr los test en la app desplegada en vercel
    //await page.goto('https://task-hub-zeta.vercel.app/');
    await page.goto('http://localhost:3000/');

    page.setDefaultTimeout(60000);
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
            await page.waitForSelector('[class="react-datepicker__input-container"] > input');
            await page.fill('[class="react-datepicker__input-container"] > input', '03/03/2024');

            await page.getByLabel('Fecha de vencimiento').click();
            await page.getByLabel('Next Month').click();
            await page.getByLabel('Choose viernes, 19 de abril de').click();

            await page.getByRole('button', { name: 'Crear Tarea' }).click();

            await page.waitForTimeout(1500); //para esperar un poco entre tarea y tarea
        }
    })

    test('Sin seleccion de prioridades', async ({ page }) => {
        await page.getByLabel('titulo').fill(`Sin prioridad`);
        await page.getByLabel('descripcion').fill(`Esta tarea no deberia poder ser creada`);
        
        await page.waitForTimeout(1000);
        await page.click('[id="fechaVencimiento"]');
        await page.fill('[class="react-datepicker__input-container"] > input', '03/03/2024');
        await page.getByLabel('Fecha de vencimiento').click();
        await page.getByLabel('Next Month').click();
        await page.getByLabel('Choose viernes, 19 de abril de').click();

        await page.getByRole('button', { name: 'Crear Tarea' }).click();

        await page.waitForTimeout(5000);
        const errorMessage = await page.isVisible('.invalid-feedback');
        expect(errorMessage).toBeTruthy();
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

test('Pongo todas las tareas en estado "En curso"', async ({ page }) => { //este test requiere que haya tareas creadas
    
    //espera que las tarjetas estén disponibles en la página
    await page.waitForSelector('div.mb-3.col');

    const cardCount = await page.$$eval('div.mb-3.col', divs => divs.length);
    
    for (let i = 0; i < cardCount; i++) {
        await page.locator(`div.mb-3.col:nth-child(${i + 1}) > .mb-3 > .card-body > p:nth-child(2) > span > .form-control`).selectOption('En curso');
        await page.waitForTimeout(300); //con este tiempo de espera soluciono que no se saltee alguna tarea a veces
    }
});

test('Asignar estados aleatorios a las tareas', async ({ page }) => { //este test requiere que haya tareas creadas
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

test('Capturar los titulos de todas las tareas', async ({ page }) => {//este test requiere que haya tareas creadas
    await page.waitForSelector('div.mb-3.col');

    const taskTitles = await page.$$eval('div.mb-3.col > div.card > div.card-header > span', elements =>
        elements.map(element => element.textContent)
    );

    console.log('Títulos de las tareas:');
    console.log(taskTitles);

    //verificar que se hayan encontrado títulos de tareas
    expect(taskTitles.length).toBeGreaterThan(0);
});


test('Automatizacion del proceo completo, con capturas', async ({ page }) => {
    await page.waitForTimeout(4000);

    await page.getByPlaceholder('Escribe un titulo...').click();
    await page.getByPlaceholder('Escribe un titulo...').press('CapsLock');
    await page.getByPlaceholder('Escribe un titulo...').fill('Tarea grabada');
    await page.getByPlaceholder('Descripcion').click();
    await page.getByPlaceholder('Descripcion').press('CapsLock');
    await page.getByPlaceholder('Descripcion').fill('Esta es una tarea que se crea con generación de codigo');
    await page.getByLabel('Prioridad').selectOption('Alta');
    await page.getByLabel('Fecha de vencimiento').click();
    await page.getByLabel('Next Month').click();
    await page.getByLabel('Choose viernes, 19 de abril de').click();
    await page.getByRole('button', { name: 'Crear Tarea' }).click();
  
    //contar la cantidad de tareas para tener el numero de la ultima
    const cardCount = await page.$$eval('div.mb-3.col', divs => divs.length)+1;
    console.log("el numero de la ultima card creada es: "+cardCount);
  
    await page.waitForTimeout(3000);
    await page.screenshot({path: 'tests/screenshots/nueva.png', fullPage: true});//captura luego de crear
  
    await page.waitForSelector(`div:nth-child(${cardCount}) > .mb-3 > .card-body > .btn`, { timeout: 3000 });
  
    await page.locator(`div:nth-child(${cardCount}) > .mb-3 > .card-body > p:nth-child(2) > span > .form-control`).selectOption('Completada');
    
    await page.waitForTimeout(5000);
    await page.screenshot({path: 'tests/screenshots/completada.png', fullPage: true});//captura despues de marcar como completada
  
    await page.waitForSelector(`div:nth-child(${cardCount}) > .mb-3 > .card-body > .btn.btn-secondary`, { timeout: 10000 }); 
    await page.click(`div:nth-child(${cardCount}) > .mb-3 > .card-body > .btn.btn-secondary`);  
  
    await page.waitForTimeout(1000);
    await page.screenshot({path: 'tests/screenshots/resuelta.png', fullPage: true});//captura luego de que la tarea fue resuleta
  });
  
  