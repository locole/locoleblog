import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Button';
import Layout from '../Layout/Layout';
const ErrorStyles = styled.div`
max-width: 1200px;
margin: 0 auto;
/* Smartphones (portrait and landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2) {
/* Styles */
}

/* Smartphones (landscape) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {
/* Styles */

}

/* Smartphones (portrait) ----------- */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
/* Styles */
.error-content {
    display: none;
}
}

/* iPads (portrait and landscape) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) {
/* Styles */
}

/* iPads (landscape) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape) {
/* Styles */
}

/* iPads (portrait) ----------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) {
/* Styles */
}

/* Desktops and laptops ----------- */
@media only screen 
and (min-width : 1224px) {
/* Styles */
}
`
const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
      document.title="Not Found Page";
    })
    return (
        <ErrorStyles>
          <Layout>
           <div className='flex items-center justify-center w-full gap-10 '>
            <div className='flex flex-col gap-3 error-content'>
                <h3 className='text-[45px] font-semibold leading-[65px] '>OPss...</h3>
                <h2 className='text-[45px] font-medium leading-[65px] '>Page not found</h2>
                <span className='text-lg font-medium ' >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.</span>
                <div className='w-[200px]'>
                  <Button type="button" onclick={() => {
                    navigate("/home");
                  }}>Go back</Button>
                 </div>
            </div>
            <div className='w-[500px] h-[500px]'>
          <img src="../ErrorCat.png" alt="" className='object-cover w-full h-full' />
          </div>
           </div>
          </Layout>
            
        </ErrorStyles>
    );
};

export default ErrorPage;