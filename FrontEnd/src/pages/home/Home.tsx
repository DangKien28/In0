import { useNavigate } from 'react-router-dom';

import HomeBanner from '../../components/home/HomeBanner';
import PromptBox from '../../components/home/PromptBox';
import WorkKanban from '../../components/work/WorkKanban';
import { scenarioInitialPrompt } from '../../data/mockScenario';
import { mockCurrentUser } from '../../data/mockUser';
import { useChatFlow } from '../../hooks/useChatFlow';
import { paths } from '../../routes/paths';

function Home() {
  const navigate = useNavigate();
  const { startWithPrompt } = useChatFlow();
  const firstName = mockCurrentUser.name.split(' ').slice(-2).join(' ');

  const handlePrompt = (prompt: string, file?: File) => {
    startWithPrompt(
      prompt || scenarioInitialPrompt,
      file ? { name: file.name, type: file.type } : undefined,
    );
    navigate(paths.chat);
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6">
      <HomeBanner
        userFirstName={firstName}
        onStartSample={() => handlePrompt('')}
      />
      <PromptBox onSubmit={handlePrompt} />
      <WorkKanban />
    </section>
  );
}

export default Home;
