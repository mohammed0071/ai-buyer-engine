'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Target, Plus, Edit2, Trash2, X, Users, CheckCircle2, Loader2
} from 'lucide-react';
import { ICP } from '@/types';
import { toast } from 'sonner';

function TagInput({ label, values, onAdd, onRemove, placeholder }: {
  label: string;
  values: string[];
  onAdd: (val: string) => void;
  onRemove: (val: string) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
      />
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((val) => (
            <Badge key={val} variant="outline" className="border-zinc-700 text-zinc-300 gap-1 pr-1">
              {val}
              <button onClick={() => onRemove(val)} className="hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ICPPage() {
  const [icps, setICPs] = useState<ICP[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingICP, setEditingICP] = useState<ICP | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [industries, setIndustries] = useState<string[]>([]);
  const [companySizes, setCompanySizes] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [seniorityLevels, setSeniorityLevels] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);

  useEffect(() => {
    fetchICPs();
  }, []);

  const fetchICPs = async () => {
    try {
      const res = await fetch('/api/icp');
      const data = await res.json();
      setICPs(data.data || []);
    } catch (err) {
      console.error('Error fetching ICPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setIndustries([]);
    setCompanySizes([]);
    setRoles([]);
    setSeniorityLevels([]);
    setKeywords([]);
    setLocations([]);
    setTechStack([]);
  };

  const loadICP = (icp: ICP) => {
    setName(icp.name);
    setIndustries(icp.criteria.industries);
    setCompanySizes(icp.criteria.company_sizes);
    setRoles(icp.criteria.roles);
    setSeniorityLevels(icp.criteria.seniority_levels);
    setKeywords(icp.criteria.keywords);
    setLocations(icp.criteria.locations);
    setTechStack(icp.criteria.tech_stack);
    setEditingICP(icp);
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a profile name');
      return;
    }

    setSaving(true);
    const icpData = {
      name,
      criteria: {
        industries,
        company_sizes: companySizes,
        roles,
        seniority_levels: seniorityLevels,
        keywords,
        locations,
        tech_stack: techStack,
      },
      negative_filters: [],
    };

    try {
      if (editingICP) {
        await fetch('/api/icp', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingICP.id, ...icpData }),
        });
        toast.success('ICP updated successfully');
      } else {
        await fetch('/api/icp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(icpData),
        });
        toast.success('ICP created successfully');
      }

      setIsCreating(false);
      resetForm();
      setEditingICP(null);
      await fetchICPs();
    } catch (err) {
      console.error('Error saving ICP:', err);
      toast.error('Failed to save ICP');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/icp?id=${id}`, { method: 'DELETE' });
      toast.success('ICP deleted');
      await fetchICPs();
    } catch (err) {
      console.error('Error deleting ICP:', err);
      toast.error('Failed to delete ICP');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" />
            ICP Builder
          </h1>
          <p className="text-zinc-400 mt-1">Define your ideal customer profiles for signal targeting</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-500 text-white"
          onClick={() => { resetForm(); setEditingICP(null); setIsCreating(true); }}
        >
          <Plus className="w-4 h-4 mr-2" /> Create ICP
        </Button>
      </div>

      {/* Existing ICPs */}
      <div className="grid md:grid-cols-2 gap-4">
        {icps.map((icp) => (
          <Card key={icp.id} className="bg-zinc-900/50 border-zinc-800 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{icp.name}</h3>
                  <Badge className={icp.is_active ? 'bg-green-500/10 text-green-400 border-0' : 'bg-zinc-700/50 text-zinc-400 border-0'}>
                    {icp.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 w-8 p-0" onClick={() => loadICP(icp)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400 h-8 w-8 p-0" onClick={() => handleDelete(icp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {icp.criteria.industries?.length > 0 && (
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Industries</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {icp.criteria.industries.map((i: string) => (
                      <Badge key={i} variant="outline" className="border-zinc-700 text-zinc-300 text-xs">{i}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {icp.criteria.roles?.length > 0 && (
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Roles</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {icp.criteria.roles.map((r: string) => (
                      <Badge key={r} variant="outline" className="border-blue-500/20 text-blue-400 text-xs">{r}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {icp.criteria.keywords?.length > 0 && (
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Keywords</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {icp.criteria.keywords.map((k: string) => (
                      <Badge key={k} variant="outline" className="border-amber-500/20 text-amber-400 text-xs">{k}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {icp.criteria.company_sizes?.length > 0 && (
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Company Size</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {icp.criteria.company_sizes.map((s: string) => (
                      <Badge key={s} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">{s} employees</Badge>
                    ))}
                  </div>
                </div>
              )}

              {icp.negative_filters?.length > 0 && (
                <div className="pt-2 border-t border-zinc-800">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Exclusions</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {icp.negative_filters.map((f: any, i: number) => (
                      <Badge key={i} variant="outline" className="border-red-500/20 text-red-400 text-xs">
                        <X className="w-2.5 h-2.5 mr-1" /> {f.value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="bg-zinc-900/50 border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {editingICP ? 'Edit ICP' : 'Create New ICP'}
            </h3>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" onClick={() => setIsCreating(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-5 max-w-2xl">
            <div className="space-y-2">
              <Label className="text-zinc-300">Profile Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., B2B SaaS Sales Leaders"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <TagInput label="Industries" values={industries} onAdd={(v) => setIndustries([...industries, v])} onRemove={(v) => setIndustries(industries.filter(i => i !== v))} placeholder="Type an industry and press Enter" />
            <TagInput label="Target Roles" values={roles} onAdd={(v) => setRoles([...roles, v])} onRemove={(v) => setRoles(roles.filter(r => r !== v))} placeholder="e.g., VP Sales, Head of Growth" />
            <TagInput label="Company Sizes" values={companySizes} onAdd={(v) => setCompanySizes([...companySizes, v])} onRemove={(v) => setCompanySizes(companySizes.filter(s => s !== v))} placeholder="e.g., 10-50, 50-200" />
            <TagInput label="Seniority Levels" values={seniorityLevels} onAdd={(v) => setSeniorityLevels([...seniorityLevels, v])} onRemove={(v) => setSeniorityLevels(seniorityLevels.filter(s => s !== v))} placeholder="e.g., Director, VP, C-Level" />
            <TagInput label="Keywords (for signal matching)" values={keywords} onAdd={(v) => setKeywords([...keywords, v])} onRemove={(v) => setKeywords(keywords.filter(k => k !== v))} placeholder="e.g., outbound, SDR, prospecting" />
            <TagInput label="Locations" values={locations} onAdd={(v) => setLocations([...locations, v])} onRemove={(v) => setLocations(locations.filter(l => l !== v))} placeholder="e.g., United States, United Kingdom" />
            <TagInput label="Tech Stack" values={techStack} onAdd={(v) => setTechStack([...techStack, v])} onRemove={(v) => setTechStack(techStack.filter(t => t !== v))} placeholder="e.g., Salesforce, HubSpot" />

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                {editingICP ? 'Save Changes' : 'Create ICP'}
              </Button>
              <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Target List Upload */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Target Lists</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Upload a CSV of X/Twitter handles to monitor specific accounts for signals.
        </p>
        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-600 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-300 font-medium">Drop your CSV here or click to browse</p>
          <p className="text-xs text-zinc-500 mt-1">CSV with columns: twitter_handle, name, company (optional)</p>
        </div>
      </Card>
    </div>
  );
}
