// games ---
import Capsule from "components/molecules/games/capsule";
import ClawMachine from "components/molecules/games/clawMachine";

const Game = (props: any) => {
  const { gameData } = props;

  const activeGame = () => {
    switch (gameData?.code) {
      case "capsule":
        return <Capsule {...props} />;

      case "claw-machine":
        return <ClawMachine {...props} />;
      default:
        return <></>;
    }
  };

  return activeGame();
};

export default Game;
