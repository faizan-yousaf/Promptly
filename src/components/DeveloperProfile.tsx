                                                        'use client';

                                                        import { Github, Twitter, Linkedin, Mail, Globe, ExternalLink } from 'lucide-react';

                                                        interface DeveloperProfileProps {
                                                        name?: string;
                                                        role?: string;
                                                        avatar?: string;
                                                        bio?: string;
                                                        skills?: string[];
                                                        socialLinks?: {
                                                            github?: string;
                                                            twitter?: string;
                                                            linkedin?: string;
                                                            email?: string;
                                                            website?: string;
                                                        };
                                                        }

                                                        export default function DeveloperProfile({
                                                        name,
                                                        role,
                                                        avatar,
                                                        bio,
                                                        skills,
                                                        socialLinks
                                                        }: DeveloperProfileProps) {
                                                        // Default values
                                                        const defaultProps = {
                                                            name: "Muhammad Faizan",
                                                            role: "AI/ML Engineer",
                                                            avatar: "https://res.cloudinary.com/dhditogyd/image/upload/v1756061345/1755800863_2_hbbfoe.png",
                                                            bio: "I am a passionate AI/ML Engineer with a strong focus on building scalable and efficient AI solutions. I have a deep understanding of machine learning, deep learning, and natural language processing. I am also a skilled full stack developer with a passion for building web applications.",
                                                            skills: ["Python", "Machine Learning", "Deep Learning", "Natural Language Processing", "Generative AI", 
                                                            "RAG", "AI Agents", "JavaScript", "React", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "HTML", "CSS"],
                                                            socialLinks: {
                                                            github: "https://github.com/faizan-yousaf",
                                                            twitter: "https://x.com/faizany26996790",
                                                            linkedin: "https://www.linkedin.com/in/mrfaizanyousaf",
                                                            email: "faizanyousaf815@gmail.com",
                                                            website: "https://kaggle.com/faizanyousafonly"
                                                            }
                                                        };

                                                        // Use provided values or defaults
                                                        const finalName = name || defaultProps.name;
                                                        const finalRole = role || defaultProps.role;
                                                        const finalAvatar = avatar || defaultProps.avatar;
                                                        const finalBio = bio || defaultProps.bio;
                                                        const finalSkills = skills || defaultProps.skills;
                                                        const finalSocialLinks = socialLinks || defaultProps.socialLinks;
                                                        return (
                                                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                                            {/* Avatar and Basic Info */}
                                                            <div className="text-center mb-6">
                                                                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                                                {finalAvatar ? (
                                                                    <img
                                                                    src={finalAvatar}
                                                                    alt={finalName}
                                                                    className="w-32 h-32 rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-4xl font-bold text-black">
                                                                    {finalName.charAt(0).toUpperCase()}
                                                                    </span>
                                                                )}
                                                                </div>
                                                                <h4 className="text-xl font-semibold mb-2 text-white">{finalName}</h4>
                                                                <p className="text-cyan-400 mb-3 font-medium">{finalRole}</p>
                                                                <p className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto">
                                                                {finalBio}
                                                                </p>
                                                            </div>

                                                            {/* Skills */}
                                                            <div className="mb-6">
                                                                <h5 className="text-sm font-semibold text-white/80 mb-3">Skills & Technologies</h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                {finalSkills.map((skill, index) => (
                                                                    <span
                                                                    key={index}
                                                                    className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                                                                    >
                                                                    {skill}
                                                                    </span>
                                                                ))}
                                                                </div>
                                                            </div>

                                                            {/* Social Links */}
                                                            <div className="flex justify-center space-x-3">
                                                                {finalSocialLinks.github && (
                                                                <a
                                                                    href={finalSocialLinks.github}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Github className="w-5 h-5" />
                                                                </a>
                                                                )}
                                                                {finalSocialLinks.twitter && (
                                                                <a
                                                                    href={finalSocialLinks.twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-blue-400 transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Twitter className="w-5 h-5" />
                                                                </a>
                                                                )}
                                                                {finalSocialLinks.linkedin && (
                                                                <a
                                                                    href={finalSocialLinks.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Linkedin className="w-5 h-5" />
                                                                </a>
                                                                )}
                                                                {finalSocialLinks.email && (
                                                                <a
                                                                    href={`mailto:${finalSocialLinks.email}`}
                                                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-red-400 transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <Mail className="w-5 h-5" />
                                                                </a>
                                                                )}
                                                                {finalSocialLinks.website && (
                                                                <a
                                                                    href={finalSocialLinks.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
                                                                >
                                                                    <ExternalLink className="w-5 h-5" />
                                                                </a>
                                                                )}
                                                            </div>
                                                            </div>
                                                        );
                                                        }