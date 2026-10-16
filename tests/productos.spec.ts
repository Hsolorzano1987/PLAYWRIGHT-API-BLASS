import {test, expect, request } from "@playwright/test";
import { logApi } from "../utils/apiLogger";

test.describe("Productos", () => {
    test("Obtener todos los productos", async ({request}) => {
        const response = await request.get("productos");
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    })

        test("Obtener un producto", async ({request}) => {
        const response = await request.get("productos/2");
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });

            test("Elimnar un producto", async ({request}) => {
        const response = await request.delete("productos/2");
        await logApi(response, 'DELETE');
        await expect(response).toBeOK();
    });

        test("Ordenar productos", async ({request}) => {
        const requestOptions = {
            params: {
                sortBy: "precio",
                oreder: "asc",
            },
        };

        const response = await request.get("productos", requestOptions);
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });

            test("Buscar productos", async ({request}) => {
        const requestOptions = {
            params: {
                nombre: "Vinagreta",
            },
        };

        const response = await request.get("productos", requestOptions);
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });

            test("Filtrar productos", async ({request}) => {
        const requestOptions = {
            params: {
                filterBy: "perecible",
                value: false,
            },
        };

        const response = await request.get("productos", requestOptions);
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });
});

