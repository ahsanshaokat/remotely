import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Settings.scss';
import MyProfile from './MyProfile/MyProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, mt: -13 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Box>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          User Settings
        </Typography>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
          <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="Profile Settings" {...a11yProps(1)} />
            <Tab label="Contact Info" {...a11yProps(2)} />
            <Tab label="Tax Information" {...a11yProps(3)} />
            <Tab label="Tax Forms" {...a11yProps(4)} />
            <Tab label="Billing & Payments" {...a11yProps(5)} />
            <Tab label="Membership & Spans" {...a11yProps(6)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant='h6'>My Profile</Typography>
            <MyProfile></MyProfile>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Profile Settings
          </TabPanel>
          <TabPanel value={value} index={2}>
            Contact Info
          </TabPanel>
          <TabPanel value={value} index={3}>
            Tax Information
          </TabPanel>
          <TabPanel value={value} index={4}>
            Tax Forms
          </TabPanel>
          <TabPanel value={value} index={5}>
            Billing & Payments
          </TabPanel>
          <TabPanel value={value} index={6}>
            Membership & Spans
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
}