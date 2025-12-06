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
} from "@/types/profileTypes";
const baseURL = import.meta.env.VITE_BASE_URL;
// const token = localStorage.getItem("token");
const token = "149|PeKKYSuEB1ht9lH0Cb0CxO29hD5vWvcj2rqhOTz2ca0d60d9";
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
    formData.append("_method", "PUT");
    // formData.append("birthdate", userUpdatedData.birthdate);
    // if (userUpdatedData.avatar)
    // formData.append("avatar", userUpdatedData.avatar);
    const res = await fetch(`${baseURL}updateProfile`, {
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
    const res = await fetch(`${baseURL}payment-methods`, {
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
    const res = await fetch(`${baseURL}payment-methods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCardData),
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
export async function deleteCard(
  paymentMethodId: number
): Promise<DeleteCardResponse> {
  try {
    const res = await fetch(`${baseURL}payment-methods/${paymentMethodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(paymentMethodId);
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
        "Content-Type": "application/json",
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
export async function deleteAccount(): Promise<DeleteResponse> {
  try {
    const res = await fetch(`${baseURL}delete-account`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
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
