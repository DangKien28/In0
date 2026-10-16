import PageHeader from '../../components/common/PageHeader';
import ReportProblemForm from '../../components/help/ReportProblemForm';
import SupportEmailForm from '../../components/help/SupportEmailForm';

function Help() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <PageHeader
        title="Trung tâm Trợ giúp & Báo cáo Sự cố"
        description="Liên hệ hỗ trợ kỹ thuật và gửi phản hồi lỗi phát sinh trong quá trình vận hành In0."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SupportEmailForm />
        <ReportProblemForm />
      </div>
    </section>
  );
}

export default Help;
