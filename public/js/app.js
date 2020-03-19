console.log("hello there")

$("#consultar").click((response)=>{
    consulta()
})

$("form").submit((e)=>{
    e.preventDefault();
    consulta()
})

const consulta = () => {
    const address = $("#address").val()
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response)=> response.json())
    .then( (respuesta)  => {
            $("#error").hide()
            $("#respuesta").hide()
            if(respuesta.error){
                $("#error").show()
                $("#error").html(respuesta.error)
            }else{
                $("#respuesta").show()
                $("#respuesta h2").html(`El clima para: ${respuesta.location}`)
                $("#respuesta p").html(`${respuesta.weather}`)
            }
        })
}