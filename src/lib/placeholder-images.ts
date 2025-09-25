
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type TeamMember = {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
    imageHint: string;
}

export const TeamMembers: TeamMember[] = data.teamMembers;
