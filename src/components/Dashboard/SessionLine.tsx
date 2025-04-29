export const SessionLine = (
  {title, value}: {title: string; value: string}
) => {
  return (
    <div>
      <div className='font-semibold'>{title}</div>
      <div>{value}</div>
    </div>
  );
};