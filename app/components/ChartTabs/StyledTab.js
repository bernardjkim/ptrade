import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';

const StyledTab = styled(Tab)`
  min-width: 72px;
  margin-right: 4em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Seqoe UI Emoji',
    'Segoe UI Symmbol';

  &:hover {
    color: #40a9ff;
    opacity: 1;
  }
  &$tabSelected {
    color: #1890ff;
    font-weight: medium;
  }
  &:focus {
    color: #40a9ff;
  }
`;

export default StyledTab;
