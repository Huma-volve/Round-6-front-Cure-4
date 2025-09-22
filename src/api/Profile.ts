import type {
  AllCardsResponse,
  DeleteCardResponse,
  DeleteResponse,
  EditProfileRequestData,
  EditProfileResponse,
  FAQsResponse,
  LogoutResponse,
  NewCardRequest,
  NewCardResponse,
  PrivacyPolicyResponse,
  ProfileResponse,
} from "@/types/ProfileTypes/types";
const baseURL = import.meta.env.VITE_BASE_URL;
const token = "383|mdmLLgyAnsdla62AdSTKfsfTuAvbgDnikbbDZsZD37c7c1cc";
export async function privacyContent(): Promise<PrivacyPolicyResponse> {
  try {
    const res = await fetch(`${baseURL}pages/privacy-policy`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
export async function FAQsContent(): Promise<FAQsResponse> {
  try {
    const res = await fetch(`${baseURL}faqs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}

export async function getUserProfile(): Promise<ProfileResponse> {
  try {
    const res = await fetch(`${baseURL}me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
export async function editUserProfile(
  userUpdatedData: EditProfileRequestData
): Promise<EditProfileResponse> {
  try {
    const formData = new FormData();
    formData.append("name", userUpdatedData.name);
    formData.append("phone", userUpdatedData.phone);
    formData.append("birthdate", userUpdatedData.birthdate);
    if (userUpdatedData.avatar)
      formData.append("avatar", userUpdatedData.avatar);
    const res = await fetch(`${baseURL}profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Post failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected post error");
  }
}
export async function getAllCards(): Promise<AllCardsResponse> {
  try {
    const res = await fetch(`${baseURL}cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Fetch failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected fetch error");
  }
}
export async function addNewCard(
  newCardData: NewCardRequest
): Promise<NewCardResponse> {
  try {
    const formData = new FormData();
    formData.append("card_token", newCardData.card_token);
    formData.append("holder_name", newCardData.holder_name);
    formData.append("exp_month", newCardData.exp_month);

    formData.append("number", newCardData.number);
    const res = await fetch(`${baseURL}cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Post failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected post error");
  }
}
export async function deleteCard(cardID: number): Promise<DeleteCardResponse> {
  try {
    const res = await fetch(`${baseURL}cards/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(cardID);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Delete failed");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected delete error");
  }
}
export async function logout(): Promise<LogoutResponse> {
  try {
    const res = await fetch(`${baseURL}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Logout failed");
    }
    const data = await res.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected Logout error");
  }
}
export async function deleteAccount(password: string): Promise<DeleteResponse> {
  try {
    const formData = new FormData();
    formData.append("password", password);
    const res = await fetch(`${baseURL}delete_account`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Deletion failed");
    }
    const data = await res.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected Delete error");
  }
}
