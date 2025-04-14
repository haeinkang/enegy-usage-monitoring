import { SidoFullName } from "../constants/regionNameMap";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";

interface LeftPanelProps {
  sido?: SidoFullName;
  setSido: React.Dispatch<React.SetStateAction<SidoFullName | undefined>>;
}

const LeftPanel = (props: LeftPanelProps) => {
  const onClickBack = () => {
    props.setSido(undefined);
  };
  return (
    <div
      className={`
        absolute inset-0 z-10
        max-w-[600px]
        lg:w-[45vw]
        md:w-[48vw]
        sm:w-[50vw]
        sm:inset-4
        ${
          props.sido
            ? "opacity-100 visibility-visible pointer-events-auto"
            : "opacity-0 visibility-hidden pointer-events-none"
        }
      `}
    >
      <div
        className={`
          w-full h-full
          bg-white border p-5 pt-10
          border-neutral-200
          transition-all duration-200 ease-in
          sm:rounded-2xl
          sm:bg-white/85
          sm:backdrop-blur-md 
          sm:shadow-xl
        `}
      >
        {/* header */}
        <div className="min-h-[50px] flex w-full items-center gap-2 text-2xl">
          <button onClick={onClickBack}>
            <ArrowLeftIcon />
          </button>
          <div className="font-semibold">{props.sido}</div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
