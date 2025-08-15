import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();

        switch (location.pathname) {
          case '/':
            navigate('/income_and_expenses');
            break;
          case '/income_and_expenses':
            navigate('/financial-literacy-quiz');
            break;
          case '/financial-literacy-quiz':
            navigate('/');
            break;
          default:
            navigate('/');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);
}; 