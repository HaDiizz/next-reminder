"use client";
import ReminderCardItem from "./ReminderCardItem";

const ReminderCards = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-5">
        {data?.length > 0 ? (
          data.map((item, index) => (
            <ReminderCardItem key={index} item={item} />
          ))
        ) : (
          <span className="text-slate-400 text-lg text-center col-span-1 md:col-span-12">
            - No data -
          </span>
        )}
      </div>
    </>
  );
};

export default ReminderCards;
