import { use, useActionState } from "react";

import { isNotEmpty, hasMinLength, hasMaxLength } from "../../utils/validation";
import { OpinionsContext } from "../../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function submitOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!isNotEmpty(userName)) {
      errors.push("Please provide your username.");
    }

    if (!isNotEmpty(title)) {
      errors.push("Please write a title.");
    }

    if (!hasMinLength(body, 10) || !hasMaxLength(body, 300)) {
      console.log(body.length, "body");
      errors.push(
        "Please write an opinion between 10 and 300 characters long ",
      );
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ title, body, userName });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(submitOpinionAction, {
    errors: null,
  });

  return (
    <section className="rounded-2xl border border-slate-300/20 bg-slate-900/70 p-5 shadow-[0_10px_28px_rgba(2,6,23,0.35)] lg:sticky lg:top-24">
      <h2 className="m-0 text-xl font-bold text-slate-100">
        Share your opinion
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Add your take in a short, clear way.
      </p>

      <form
        action={formAction}
        className="mt-4 w-full max-w-none space-y-4 rounded-none bg-transparent shadow-none"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <p className="m-0">
            <label
              htmlFor="userName"
              className="mb-1 block text-xs font-semibold uppercase tracking-[0.13em] text-cyan-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
              className="w-full rounded-xl border border-slate-500/50 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
            />
          </p>

          <p className="m-0">
            <label
              htmlFor="title"
              className="mb-1 block text-xs font-semibold uppercase tracking-[0.13em] text-cyan-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
              className="w-full rounded-xl border border-slate-500/50 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
            />
          </p>
        </div>

        <p className="m-0">
          <label
            htmlFor="body"
            className="mb-1 block text-xs font-semibold uppercase tracking-[0.13em] text-cyan-300"
          >
            Your Opinion
          </label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
            className="w-full rounded-xl border border-slate-500/50 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </section>
  );
}
