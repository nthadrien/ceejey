
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
    
    <p class="h5 fw-semibold border-bottom">Filter Products By:</p>
  
    <label class="form-label fw-semibold" >
        Price Range
        <input type="range" class="form-range" name="price"/>
        <small class="text-body-emphasis fw-light">price :  $0 - $120</small>
    </label>
    
    <label class="form-label fw-semibold">
      Category
      <select class="form-control bg-body-tertiary rounded-0 border-0 border-bottom" name="category">
        {[1,2,3,4].map( category => <option value={category}> 
          {category}
        </option>)}
      </select>
    </label>
  
    <label class="form-label fw-semibold" for="brand">Brands</label>
    <div class="nav gap-2"> 
      {[1,2,3,4].map( brand => <button class="btn btn-lg btn-outline-secondary rounded-0">
        {brand}
      </button>
      )}
    </div>
  
    <label class="form-label fw-semibold" >
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
