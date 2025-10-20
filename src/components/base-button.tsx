import Button from '@mui/material/Button';

interface BaseButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export const BaseButton = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
}: BaseButtonProps) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClick} variant="contained">
      {children}
    </Button>
  );
};
