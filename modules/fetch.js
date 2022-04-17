
    export async function getGif(prod){
    try {
        const data1 = await fetch ("https://api.giphy.com/v1/gifs/search?api_key=fMcPHB3XAC64fL2JzO0P7ZQwfgLxx8A9&q=" + prod )
        const returnedData = await data1.json()
        const {data} = returnedData
        console.log(data[1].images)
        openModal(3)
        let gif = data[1].images.original.url;
        const gifImg = document.querySelector('.imagemGif')
        gifImg.src = gif
    } catch (error) {
        alert('Sem GIF para você!')
    }    

}  



