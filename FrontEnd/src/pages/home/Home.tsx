import ChatWorkspace from '../../components/chat/ChatWorkspace';
import WorkKanban from '../../components/work/WorkKanban';

function Home() {
  return (
    <section className="home-page">
      <div className="home-header">
        <h1>What would you like to accomplish?</h1>

        <p>
          Describe what you want In0 to do, and In0 will help you
          create and execute the workflow.
        </p>
      </div>

      <ChatWorkspace />

      <div className="suggested-tasks">
        <span>Try something like</span>

        <div className="suggested-task-list">
          <button type="button">Screen CVs</button>

          <button type="button">Prepare Interview</button>

          <button type="button">Employee Onboarding</button>

          <button type="button">Send Email</button>
        </div>
      </div>

      <WorkKanban />
    </section>
  );
}

export default Home;