import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
  label: any;
  loading?: any;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: any;
  variant?: any;
  startIcon?: any;
  endIcon?: any;
}

const CButton: React.FC<IProps> = ({
  label,
  loading,
  onClick,
  type = 'button',
  color = 'primary',
  variant = 'contained',
  startIcon,
  endIcon
}: IProps) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      color={color}
      variant={variant}
      sx={{
        margin: '15px 0',
        paddingLeft: '20px',
        paddingRight: '20px',
        textAlign: 'center'
      }}
    >
      {label}
      {loading && (
        <CircularProgress
          size={28}
          color="primary"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
          }}
        />
      )}
    </Button>
  );
};

export default CButton;
