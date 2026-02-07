interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`md:rounded-3xl rounded-b-2xl bg-linear-to-l from-teal-700 to-teal-500 md:from-white md:to-white md:border-2 border-teal-600 md:bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
};