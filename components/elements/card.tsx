interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-3xl border-2 border-teal-600 bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
};