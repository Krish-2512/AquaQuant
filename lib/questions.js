function pickFirstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null);
}

export function normalizeQuestionDoc(doc) {
  if (!doc) return null;

  const plainDoc =
    typeof doc.toObject === "function" ? doc.toObject() : { ...doc };

  return {
    _id: plainDoc._id,
    id: plainDoc._id?.toString?.() || plainDoc.id || "",
    title: pickFirstDefined(plainDoc.title, plainDoc.Title, "Untitled Question"),
    content: pickFirstDefined(plainDoc.content, plainDoc.Content, ""),
    category: pickFirstDefined(plainDoc.category, plainDoc.Category, "General"),
    difficulty: pickFirstDefined(plainDoc.difficulty, plainDoc.Difficulty, "Medium"),
    status: pickFirstDefined(plainDoc.status, plainDoc.Status, "UnAttempted"),
    companyTags: pickFirstDefined(plainDoc.companyTags, plainDoc.CompanyTags, []),
    answer: pickFirstDefined(plainDoc.answer, plainDoc.Answer, ""),
    solution: pickFirstDefined(plainDoc.solution, plainDoc.Solution, ""),
    relatedTopics: pickFirstDefined(plainDoc.relatedTopics, plainDoc.RelatedTopics, []),
    createdAt: pickFirstDefined(plainDoc.createdAt, plainDoc.CreatedAt, null),
  };
}

export function buildQuestionFilters({ category, difficulty, status, search }) {
  const andFilters = [];

  if (category && category !== "All") {
    andFilters.push({
      $or: [{ category }, { Category: category }],
    });
  }

  if (difficulty && difficulty !== "All") {
    andFilters.push({
      $or: [{ difficulty }, { Difficulty: difficulty }],
    });
  }

  if (status && status !== "All") {
    andFilters.push({
      $or: [{ status }, { Status: status }],
    });
  }

  if (search) {
    andFilters.push({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { Title: { $regex: search, $options: "i" } },
        { companyTags: { $regex: search, $options: "i" } },
        { CompanyTags: { $regex: search, $options: "i" } },
      ],
    });
  }

  if (andFilters.length === 0) {
    return {};
  }

  return andFilters.length === 1 ? andFilters[0] : { $and: andFilters };
}
