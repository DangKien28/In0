import type { FormEvent } from 'react';

import Button from '../../components/common/Button';
import Field from '../../components/common/Field';
import PageHeader from '../../components/common/PageHeader';
import UserAvatar from '../../components/layout/UserAvatar';
import { mockCurrentUser } from '../../data/mockUser';
import { useToast } from '../../hooks/useToast';
import { compactInputClass } from '../../utils/formStyles';

function Profile() {
  const { showToast } = useToast();
  const user = mockCurrentUser;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No user-profile API yet: changes are not persisted.
    showToast('Đã ghi nhận thay đổi thông tin cá nhân.');
  };

  const fields = [
    { id: 'profile-name', label: 'Họ và tên:', value: user.name, type: 'text' },
    { id: 'profile-email', label: 'Email:', value: user.email, type: 'email' },
    {
      id: 'profile-department',
      label: 'Phòng ban:',
      value: user.department,
      type: 'text',
    },
    {
      id: 'profile-phone',
      label: 'Số điện thoại:',
      value: user.phone,
      type: 'tel',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4">
      <PageHeader
        title="Thông Tin Cá Nhân"
        description="Quản lý tài khoản HR và quyền hạn thao tác trên In0."
      />

      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <UserAvatar initials={user.initials} size="lg" />
          <div>
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <p className="text-xs text-slate-500">{user.title}</p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
              Role: {user.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.id} label={field.label} htmlFor={field.id}>
                <input
                  id={field.id}
                  type={field.type}
                  defaultValue={field.value}
                  className={compactInputClass}
                />
              </Field>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="px-5">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
