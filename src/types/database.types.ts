export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            alt_courses: {
                Row: {
                    course_id: number;
                    course_name: string;
                    course_number: string;
                    credits: number;
                    department: string;
                };
                Insert: {
                    course_id?: never;
                    course_name: string;
                    course_number: string;
                    credits: number;
                    department: string;
                };
                Update: {
                    course_id?: never;
                    course_name?: string;
                    course_number?: string;
                    credits?: number;
                    department?: string;
                };
                Relationships: [];
            };
            alt_courses_wave1: {
                Row: {
                    course_id: number | null;
                    course_name: string | null;
                    course_number: string | null;
                    department: string | null;
                };
                Insert: {
                    course_id?: number | null;
                    course_name?: string | null;
                    course_number?: string | null;
                    department?: string | null;
                };
                Update: {
                    course_id?: number | null;
                    course_name?: string | null;
                    course_number?: string | null;
                    department?: string | null;
                };
                Relationships: [];
            };
            alt_sections: {
                Row: {
                    co_sem_id: string;
                    credits: number;
                    crn: number;
                    days: string[] | null;
                    end_times: number[] | null;
                    info: string | null;
                    instructor: string | null;
                    location: string[] | null;
                    section_id: string;
                    section_number: string;
                    start_times: number[] | null;
                    status: string;
                };
                Insert: {
                    co_sem_id: string;
                    credits: number;
                    crn: number;
                    days?: string[] | null;
                    end_times?: number[] | null;
                    info?: string | null;
                    instructor?: string | null;
                    location?: string[] | null;
                    section_id: string;
                    section_number: string;
                    start_times?: number[] | null;
                    status: string;
                };
                Update: {
                    co_sem_id?: string;
                    credits?: number;
                    crn?: number;
                    days?: string[] | null;
                    end_times?: number[] | null;
                    info?: string | null;
                    instructor?: string | null;
                    location?: string[] | null;
                    section_id?: string;
                    section_number?: string;
                    start_times?: number[] | null;
                    status?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "fk_sections_course_semester_id";
                        columns: ["co_sem_id"];
                        isOneToOne: false;
                        referencedRelation: "course_semester";
                        referencedColumns: ["co_sem_id"];
                    },
                ];
            };
            alt_semesters: {
                Row: {
                    season: string;
                    semester_id: string;
                    year: string;
                };
                Insert: {
                    season: string;
                    semester_id: string;
                    year: string;
                };
                Update: {
                    season?: string;
                    semester_id?: string;
                    year?: string;
                };
                Relationships: [];
            };
            course_semester: {
                Row: {
                    co_sem_id: string;
                    course_id: number;
                    semester_id: string;
                };
                Insert: {
                    co_sem_id: string;
                    course_id: number;
                    semester_id: string;
                };
                Update: {
                    co_sem_id?: string;
                    course_id?: number;
                    semester_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "course_semester_course_id_fkey";
                        columns: ["course_id"];
                        isOneToOne: false;
                        referencedRelation: "alt_courses";
                        referencedColumns: ["course_id"];
                    },
                    {
                        foreignKeyName: "course_semester_semester_id_fkey";
                        columns: ["semester_id"];
                        isOneToOne: false;
                        referencedRelation: "alt_semesters";
                        referencedColumns: ["semester_id"];
                    },
                ];
            };
            courses: {
                Row: {
                    course_id: string;
                    course_name: string | null;
                    course_number: string | null;
                    department: string | null;
                    number_of_sections: number | null;
                };
                Insert: {
                    course_id: string;
                    course_name?: string | null;
                    course_number?: string | null;
                    department?: string | null;
                    number_of_sections?: number | null;
                };
                Update: {
                    course_id?: string;
                    course_name?: string | null;
                    course_number?: string | null;
                    department?: string | null;
                    number_of_sections?: number | null;
                };
                Relationships: [];
            };
            section_semester: {
                Row: {
                    sec_sem_id: string;
                    section_id: string;
                    semester_id: string;
                };
                Insert: {
                    sec_sem_id: string;
                    section_id: string;
                    semester_id: string;
                };
                Update: {
                    sec_sem_id?: string;
                    section_id?: string;
                    semester_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "section_semester_section_id_fkey";
                        columns: ["section_id"];
                        isOneToOne: false;
                        referencedRelation: "alt_sections";
                        referencedColumns: ["section_id"];
                    },
                    {
                        foreignKeyName: "section_semester_semester_id_fkey";
                        columns: ["semester_id"];
                        isOneToOne: false;
                        referencedRelation: "alt_semesters";
                        referencedColumns: ["semester_id"];
                    },
                ];
            };
            sections: {
                Row: {
                    course: string | null;
                    credits: number | null;
                    crn: number | null;
                    days: string[] | null;
                    end_time: number | null;
                    id: number;
                    info: string | null;
                    instructor: string | null;
                    location: string | null;
                    section_number: string | null;
                    start_time: number | null;
                };
                Insert: {
                    course?: string | null;
                    credits?: number | null;
                    crn?: number | null;
                    days?: string[] | null;
                    end_time?: number | null;
                    id?: never;
                    info?: string | null;
                    instructor?: string | null;
                    location?: string | null;
                    section_number?: string | null;
                    start_time?: number | null;
                };
                Update: {
                    course?: string | null;
                    credits?: number | null;
                    crn?: number | null;
                    days?: string[] | null;
                    end_time?: number | null;
                    id?: never;
                    info?: string | null;
                    instructor?: string | null;
                    location?: string | null;
                    section_number?: string | null;
                    start_time?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "fk_sections_course_id";
                        columns: ["course"];
                        isOneToOne: false;
                        referencedRelation: "courses";
                        referencedColumns: ["course_id"];
                    },
                ];
            };
        };
        Views: {
            unique_dep: {
                Row: {
                    department: string | null;
                };
                Relationships: [];
            };
        };
        Functions: {
            get_unique_departments_in_semester: {
                Args: {
                    semester_id_param: string;
                    limit_param: number;
                };
                Returns: {
                    department: string;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
          PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
          PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
