export const Card = (
  {children} : {children: React.ReactNode}
) => {
  return (
    <div className="bg-white shadow p-8 rounded relative">
      {children}
    </div>
  );
};