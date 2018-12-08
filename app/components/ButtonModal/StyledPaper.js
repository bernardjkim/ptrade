import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(Paper)`
  position: absolute;
  width: 400px;
  box-shadow: none;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default StyledPaper;
