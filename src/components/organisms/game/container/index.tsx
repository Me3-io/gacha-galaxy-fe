
// games ---
import Capsule from "components/molecules/games/capsule";

const Game = (props: any) => {
  const { gameData } = props;

  const activeGame = () => {
    switch (gameData?.code) {
      case "capsule":
        return <Capsule {...props} />;
      default:
        return <></>;
    }
  };

  return activeGame();
};

export default Game;
