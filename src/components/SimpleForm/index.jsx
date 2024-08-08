import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '500px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  backgroundColor: '#FF6600',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#E65C00',
  },
  '&:disabled': {
    backgroundColor: '#FFB380',
    color: '#FFFFFF',
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
  },
}));

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    mobile_phone_number: '',
    email_address: '',
    status: 'Key Target Demographics',
    privacyPolicy: false,
    textMessages: false,
    referral_code: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const getReferralCode = () => {
    const path = window.location.pathname;
    const match = path.match(/\/referral-(\w+)/);
    return match && match[1] ? match[1] : '';
  };

  useEffect(() => {
    const code = getReferralCode();
    setFormData(prevData => ({
      ...prevData,
      referral_code: code,
    }));
  }, []);

  useEffect(() => {
    let timer;
    if (showSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          return prevCount - 1;
        });
      }, 1000);
    } else if (countdown === 0) {
      window.location.href = 'https://cyberbacker.com/';
    }
    return () => clearInterval(timer);
  }, [showSuccess, countdown]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: event.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.privacyPolicy && formData.textMessages) {
      setIsSubmitting(true);
      try {
        const payload = {
          client_name: formData.client_name,
          mobile_phone_number: formData.mobile_phone_number,
          status: formData.status,
          referral_code: formData.referral_code,
        };
  

        const response = await fetch('https://02zx7bj4-8003.usw2.devtunnels.ms/referral', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        setShowSuccess(true);
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please agree to both the Privacy Policy and receiving text messages.');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
          Hire a Cyberbacker
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <StyledTextField 
            required 
            fullWidth 
            id="client_name" 
            name="client_name"
            label="Full Name" 
            variant="outlined"
            value={formData.client_name}
            onChange={handleChange}
          />
          <StyledTextField 
            required 
            fullWidth 
            id="mobile_phone_number" 
            name="mobile_phone_number"
            label="Phone Number" 
            variant="outlined"
            value={formData.mobile_phone_number}
            onChange={handleChange}
          />
          <StyledTextField 
            required 
            fullWidth 
            id="email_address" 
            name="email_address"
            label="Email Address" 
            variant="outlined"
            value={formData.email_address}
            onChange={handleChange}
          />
          <StyledFormControlLabel
            control={
              <Checkbox 
                name="privacyPolicy" 
                color="primary" 
                checked={formData.privacyPolicy}
                onChange={handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I have read and agree to the{' '}
                <Link href="/privacy-policy" target="_blank" rel="noopener" color="primary">
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          <StyledFormControlLabel
            control={
              <Checkbox 
                name="textMessages" 
                color="primary"
                checked={formData.textMessages}
                onChange={handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I agree to receive text messages from Cyberbacker Inc. Message and data rates may apply.
              </Typography>
            }
          />
          <StyledButton 
            type="submit" 
            variant="contained" 
            fullWidth
            disabled={!formData.privacyPolicy || !formData.textMessages || isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Evaluate My Business for Free'}
          </StyledButton>
        </Box>
      </StyledPaper>
      <Dialog
        open={showSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {"Thank You for Signing Up!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you for signing up for a free evaluation. One of our growthbackers will be in contact with you.
            <br /><br />
            We are now taking you to the main page of cyberbacker.com in {countdown} seconds.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SimpleForm;