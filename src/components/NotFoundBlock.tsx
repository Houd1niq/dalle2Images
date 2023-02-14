import { DarkButton } from "./DarkButton";

export const NotFoundBlock = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">
        Произошла ошибка. Скорее всего такой старницы не существует
      </h2>
      <DarkButton
        link={{ isLink: true, to: "/" }}
        className="text-lg mx-auto block"
      >
        Вернуться на главную
      </DarkButton>
    </div>
  );
};
