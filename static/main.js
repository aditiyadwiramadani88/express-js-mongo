

      let table =document.querySelector('.t-body')
      let form = document.querySelector('form')
      let create = document.querySelector('.create')
      let b_close1 = document.querySelector('.b-close')
      let b_close2 = document.querySelector('.btn-close')
      let input_data = document.querySelector('.list')
      
      
      b_close1.addEventListener('click', () => {location.reload()})
      b_close2.addEventListener('click', () => {location.reload()})
      async function get_data() { 
        
        // get api 
        let data= await fetch('/')
        let result =  await data.json()
        
        // result data in show data in table
        result.forEach((element, index) => {
          
          table.innerHTML +=`
          <tr>
            <th scope="row">${index+1}</th>
            
            <td>${element.list}</td>
            <td><button type="button" class="btn btn-outline-info edit" id="${element._id}" list="${element.list}">Edit</button></td>
            <td><button type="button" class="btn btn-outline-danger delete" id="${element._id}" >Delete</button></td>
            </tr>`
            
          });


          // edit data 
          let edit_button = document.querySelectorAll('.edit')
          let delete_button = document.querySelectorAll('.delete')

          // get elemt all edit class 
          edit_button.forEach((element) =>  {
            
            // set artibut in edit button 
            element.setAttribute('data-bs-toggle', 'modal')
            element.setAttribute('data-bs-target', '#exampleModal')

            // click action
            element.addEventListener('click', (e)=> {
              e.preventDefault()
              // get artibbute id 
              const id = element.getAttribute('id')
              const list = element.getAttribute('list')
              input_data.value = list
            

              // update data 
              form.addEventListener('submit', async(e) => { 
                e.preventDefault()

                // update 
                let edit_data = await fetch('/'+id, { 
                  method: "PUT", 
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({list: input_data.value})
                })

                let result = await edit_data.json() 
                if(result.status) { 
                  input_data.classList.add('is-invalid')

                }
                alert('sucess update data')
                  location.reload()
              })

              })
          })



          delete_button.forEach(element => { 

            element.addEventListener('click', async() => { 

              let id = element.getAttribute('id')
              let delete_data = await fetch('/'+id, {
                method: "DELETE", 
                headers: {'Content-Type': 'application/json'},
              })

              alert('sucess delete data')
              location.reload()


            })
          })


        }

        get_data()



        create.addEventListener('click', (ee) => { 

          ee.preventDefault()
          input_data.value = ''
        
        // create data 
        form.addEventListener('submit', async(e) => { 
          e.preventDefault()
          // post data 
          const data = await fetch('/', { 

          method: "POST", 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({list: input_data.value})

          })

          // required validation
          const result = await data.json()
          if(result.status) { 
            input_data.classList.add('is-invalid')

          }else {

            alert('sucess create data ')
            // reloas
            location.reload()
          }

          
          
        })
      })
