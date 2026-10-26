import { useState } from 'react';
import { Camera, CheckCircle2, ShieldCheck, UserPlus } from 'lucide-react';

const emptyForm = {
  name: '',
  email: '',
  cpf: '',
  birthDate: '',
  phone: '',
  city: '',
  photo: '',
};

function formatCpf(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function isValidCpf(value) {
  const cpf = value.replace(/\D/g, '');
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;

  const calculateDigit = (length) => {
    const sum = cpf
      .slice(0, length)
      .split('')
      .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(9) === Number(cpf[9]) && calculateDigit(10) === Number(cpf[10]);
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
}

export default function Credentialing({ companyId }) {
  const [form, setForm] = useState(emptyForm);
  const [employeesByCompany, setEmployeesByCompany] = useState({});
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const employees = employeesByCompany[companyId] || [];
  const companyName = companyId === 'empire-bsb'
    ? 'Empire BSB'
    : companyId.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  const updateField = (event) => {
    const { name, value } = event.target;
    setSaved(false);
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Escolha um arquivo de imagem.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('A foto deve ter no máximo 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, photo: String(reader.result) }));
      setError('');
      setSaved(false);
    };
    reader.onerror = () => setError('Não foi possível carregar a foto. Tente outro arquivo.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSaved(false);

    if (!isValidCpf(form.cpf)) {
      setError('Confira o CPF informado.');
      return;
    }
    if (!form.photo) {
      setError('Adicione uma foto para concluir o cadastro.');
      return;
    }
    if (employees.some((employee) => employee.cpf === form.cpf.replace(/\D/g, ''))) {
      setError('Este CPF já foi cadastrado nesta sessão.');
      return;
    }

    const employee = { ...form, id: `${Date.now()}-${Math.random()}`, cpf: form.cpf.replace(/\D/g, '') };
    setEmployeesByCompany((current) => ({
      ...current,
      [companyId]: [employee, ...(current[companyId] || [])],
    }));
    setForm(emptyForm);
    setSaved(true);
    event.currentTarget.reset();
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">{companyName}</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Credenciamento</h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Cadastre os dados básicos e a foto da equipe de {companyName}.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#111] px-3 py-2 text-xs text-neutral-400">
          <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
          <span>{employees.length} {employees.length === 1 ? 'cadastro nesta sessão' : 'cadastros nesta sessão'}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#111] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-white">Dados do funcionário</h3>
            <p className="text-xs text-neutral-500">Todos os campos são obrigatórios.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-neutral-300">Nome completo</span>
              <input name="name" autoComplete="name" value={form.name} onChange={updateField} required maxLength={120} className="credential-input" placeholder="Nome e sobrenome" />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-neutral-300">E-mail</span>
              <input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} required maxLength={160} className="credential-input" placeholder="nome@exemplo.com" />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-neutral-300">CPF</span>
              <input name="cpf" inputMode="numeric" autoComplete="off" value={form.cpf} onChange={(event) => { setSaved(false); setForm((current) => ({ ...current, cpf: formatCpf(event.target.value) })); }} required className="credential-input" placeholder="000.000.000-00" />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-neutral-300">Data de nascimento</span>
              <input name="birthDate" type="date" autoComplete="bday" value={form.birthDate} onChange={updateField} required max={new Date().toISOString().slice(0, 10)} className="credential-input [color-scheme:dark]" />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-semibold text-neutral-300">Telefone</span>
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(event) => { setSaved(false); setForm((current) => ({ ...current, phone: formatPhone(event.target.value) })); }} required className="credential-input" placeholder="(61) 99999-9999" />
            </label>

            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-neutral-300">Cidade onde mora</span>
              <input name="city" autoComplete="address-level2" value={form.city} onChange={updateField} required maxLength={100} className="credential-input" placeholder="Cidade — UF" />
            </label>

            <div className="space-y-2 sm:col-span-2">
              <span className="block text-xs font-semibold text-neutral-300">Foto do funcionário</span>
              <div className="flex flex-col gap-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/60 p-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-900 text-neutral-500">
                  {form.photo ? <img src={form.photo} alt="Prévia da foto do funcionário" className="h-full w-full object-cover" /> : <Camera className="h-7 w-7" />}
                </div>
                <div className="min-w-0 flex-1">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-xs font-semibold text-white transition hover:border-[#D4AF37]">
                    <Camera className="h-4 w-4 text-[#D4AF37]" />
                    Escolher foto
                    <input type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />
                  </label>
                  <p className="mt-2 text-xs text-neutral-500">JPG, PNG ou outra imagem. Tamanho máximo: 5 MB.</p>
                </div>
              </div>
            </div>
          </div>

          <div aria-live="polite" className="space-y-2">
            {error && <p role="alert" className="rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-2 text-sm text-red-300">{error}</p>}
            {saved && <p className="flex items-center gap-2 rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Cadastro adicionado nesta sessão.</p>}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-relaxed text-neutral-500">
              Prévia sem backend: os dados e a foto ficam apenas na memória desta página e são apagados ao recarregar.
            </p>
            <button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#AA820A] px-5 py-3 text-sm font-extrabold text-black transition hover:brightness-110">
              <UserPlus className="h-4 w-4" /> Cadastrar funcionário
            </button>
          </div>
        </form>
      </div>

      {employees.length > 0 && (
        <section className="space-y-3" aria-labelledby="registered-employees-title">
          <h3 id="registered-employees-title" className="text-lg font-bold text-white">Cadastros desta sessão</h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {employees.map((employee) => (
              <li key={employee.id} className="flex min-w-0 items-center gap-4 rounded-2xl border border-neutral-800 bg-[#111] p-4">
                <img src={employee.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{employee.name}</p>
                  <p className="truncate text-sm text-neutral-400">{employee.email}</p>
                  <p className="text-xs text-neutral-500">CPF: •••.•••.•••-{employee.cpf.slice(-2)} · {employee.city}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
