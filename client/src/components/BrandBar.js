// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';

// Features
import { 
  getBrands, 
  selectBrandId, 
  selectBrandList, 
  selectBrandStatus, 
  setBrandId 
} from '../features/brandSlice';

const BrandBar = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrandList);
  const brandStatus = useSelector(selectBrandStatus);
  const brandId = useSelector(selectBrandId);

  useEffect(() => {
    if (brandStatus === 'idle') {
      dispatch(getBrands());
    }
  }, [brandStatus, dispatch]);

  const handlerForBrand = (brand) => {
    dispatch(setBrandId(brand.id));
  }; 

  const handlerRemoveBrands = () => {
    dispatch(setBrandId(0));
  };

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {brands && brands.map((brand) => 
          <Card 
            onClick={() => handlerForBrand(brand)} 
            key={brand.id}
            style={{ 
              cursor: "pointer", 
              color: brandId === brand.id ? "green" : "black",
              marginRight: "10px",
              padding: "8px"
            }}
          >
            {brand.name}
          </Card>
        )}
        <Card 
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            justifyContent: "center", 
            padding: "8px"}}
          onClick={() => handlerRemoveBrands()}  
        >
          Clear All
        </Card>
      </div>
    </Container>
  );
};

export default BrandBar;
