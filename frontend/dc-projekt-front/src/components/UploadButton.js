import React from 'react';
import styled from 'styled-components';
import '../css/client.css';
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`
;
const UploadButton = props => {
  const hiddenFileInput = React.useRef(null);

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <div className="client-button-box">             
      <Button className="button-upload">
        <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{}}
      />
      </Button>

      </div>
    </>
  );
};
export default UploadButton;