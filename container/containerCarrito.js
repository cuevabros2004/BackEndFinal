import fs from "fs";

class ContenedorCarrito{

    #carritos;
    #filename;

    constructor(filename) {
        this.#carritos = [];
        this.#filename = filename;
   }


    async save(objeto){
 
        try {
           if(await this.getAll())
            this.#carritos = await this.getAll()
        } 
        catch (error){
            this.#carritos = [];
            error => { throw error}
        } 

        try {
            this.#carritos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#carritos, null, 2))
            return 'Id del objeto guardado: ' + this.#carritos[this.#carritos.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 

      }


    async getById(id){
       
        try {
            this.#carritos = await this.getAll()

            const objetoBuscado = this.#carritos.find((p)=>p.id===id)

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

     }


     async getAll(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#carritos = contenido
                 return this.#carritos
                } else { 
                 return null
                }
            }

        catch(error){
            error => { throw error}
        } 

    }


    async deleteById(id){
        try {
            this.#carritos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#carritos.filter(p => p.id !== id), null, 2))
            return this.#carritos.filter(p => p.id == id)
        }
        catch(error){
            error => { throw error}
        } 
    }

    async deleteAll(){

        this.#carritos = []

            try {
                await fs.promises.writeFile(this.#filename, JSON.stringify(this.#carritos), null, 2)
            }
            catch(error){
                error => { throw error}
            } 

    }

    async update(objeto){
        try {
            await fs.promises.writeFile(this.#filename, JSON.stringify(objeto, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }

    async deleteByIdProd(indice_cart, indiceBuscadoProd){
        try {
            this.#carritos = await this.getAll()     
            const eliminado = this.#carritos[indice_cart].productos.splice(indiceBuscadoProd, 1)       
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#carritos, null, 2))
            return this.#carritos[indice_cart]
        }
        catch(error){
            error => { throw error}
        } 

        
    }


  }

  

  export  {ContenedorCarrito} 
  
