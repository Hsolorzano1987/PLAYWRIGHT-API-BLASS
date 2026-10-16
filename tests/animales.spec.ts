import {test, expect} from "@playwright/test"
import { logApi } from "../utils/apiLogger";
import { request } from "node:http";

test.describe("Animales", ()=> {
    test("Obtener todos los animales", async ({request})=>{
        const response = await request.get("animales");
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });

        test("Obtener un animal", async ({request})=>{
        const response = await request.get("animales/5");
        await logApi(response, 'GET');
        await expect(response).toBeOK();
    });

        test("Eliminar un animal", async ({request})=>{
        const response = await request.delete("animales/5");
        await logApi(response, 'DELETE');
        await expect(response).toBeOK();
    });

        test("Ordenar animales", async({request}) =>{
            const requestOptions = {
                params: {
                    sortBy: "edad",
                    order: "asc",
                },
            };

            const response = await request.get("animales", requestOptions);
            await logApi(response, 'GET');
            await expect(response).toBeOK();
        });

                test("Buscar animales", async({request}) =>{
            const requestOptions = {
                params: {
                    nombre: "Leo",
                },
            };

            const response = await request.get("animales", requestOptions);
            await logApi(response, 'GET');
            await expect(response).toBeOK();
        });

                test("Filtrar animales", async({request}) =>{
            const requestOptions = {
                params: {
                    filterBy: "tipo",
                    value: "salvaje",
                },
            };

            const response = await request.get("animales", requestOptions);
            await logApi(response, 'GET');
            await expect(response).toBeOK();
        });



                    


});