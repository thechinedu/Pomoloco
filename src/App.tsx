import { useState, FC } from "react";
import { Header } from "./components/Header/Header";
import { Timer } from "./components/Timer/Timer";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { Dialog } from "./components/Dialog/Dialog";

const App: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Wrapper>
      <Header showDialog={() => setIsDialogOpen(true)} />
      <Timer />
      <Dialog open={isDialogOpen} />
    </Wrapper>
  );
};
export default App;
