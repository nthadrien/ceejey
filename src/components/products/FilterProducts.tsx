
const FilterProducts = () => {

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.entries(formData.entries());

    console.log(dataObj);

    formData.forEach( (value,key) => {
      console.log(`--${key}:${value}`);
    });


  }

    
  return (<form onSubmit={handleSubmit} style="max-width: 450px;" class="d-flex flex-column gap-3 p-2 bg-body rounded-2">
  
    <label class="form-label p-2 border rounded-2 shadow-sm" >
        Price Range
        <input type="range" class="form-range" name="price"/>
        <small class="text-body-emphasis fw-light">price :  $0 - $120</small>
    </label>
    
    <label class="form-label p-2 border rounded-2">
      All Categories
      {[1,2,3,4].map( category => <p> 
       catrgory {category}
      </p>)}
    </label>
  
    <label class="form-label p-2 border rounded-2 shadow-sm" for="brand">Brands</label>
    <div class="nav gap-2"> 
      
    </div>
  
    <label class="form-label p-2 border rounded-2 shadow-sm" >
      Others
    </label>
  
    <div>
      promotion
    </div>



    <button class="btn text-bg-primary btn-sm" type="submit">
      search
    </button>
  
  </form>)
}

export default FilterProducts
