interface Props {
  desciption: string;
  data: string;
  isLink?: boolean;
  noWrap?: boolean;
}

export default function AppCardData({ desciption, data, isLink = false, noWrap = false }: Props) {
  return (
    <div className="flex gap-x-2">
      <p className="text-gray-300">{desciption}</p>
      {isLink ? (
        <a
          href={data}
          className="text-sky-200 transition-all duration-300 hover:text-sky-500 underline break-all">
          {data}
        </a>
      ) : (
        <p style={{ whiteSpace: noWrap ? "nowrap" : "normal" }} className="font-semibold">
          {data}
        </p>
      )}
    </div>
  );
}
