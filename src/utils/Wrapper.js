const ctrl = controller => {
    try{
        await controller
    }catch(error){
        next.error
    }
}