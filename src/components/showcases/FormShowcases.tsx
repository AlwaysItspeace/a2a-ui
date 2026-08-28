import * as React from "react";
import {
  Attachment,
  Button,
  ButtonGroup,
  Calendar,
  Checkbox,
  Combobox,
  DatePicker,
  Field,
  Input,
  InputGroup,
  InputOTP,
  Label,
  NativeSelect,
  Questionnaire,
  RadioGroup,
  RadioGroupItem,
  SearchBar,
  Select,
  Slider,
  Switch,
  Textarea,
  Toggle,
  ToggleGroup,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import {
  ArrowRight,
  Search,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
} from "lucide-react";

export function FormShowcase({ id }: { id: string }) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [sliderVal, setSliderVal] = React.useState(68);
  const [switchVal, setSwitchVal] = React.useState(true);
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [otpVal, setOtpVal] = React.useState("840219");
  const [radioVal, setRadioVal] = React.useState("cluster-a");
  const [toggleVal, setToggleVal] = React.useState(true);
  const [alignVal, setAlignVal] = React.useState("left");
  const [btnGroupVal, setBtnGroupVal] = React.useState("months");
  const [selectVal, setSelectVal] = React.useState("pro");
  const [comboboxVal, setComboboxVal] = React.useState("react");
  const [searchVal, setSearchVal] = React.useState("");

  switch (id) {
    case "search-bar":
      return (
        <div className="w-full space-y-3">
          <SearchBar
            value={searchVal}
            onChange={setSearchVal}
            placeholder="Search API endpoints, methods, parameters..."
            onFilterClick={() => toast({ title: "Filter options toggled." })}
          />
        </div>
      );

    case "switch":
      return (
        <div className="w-full flex items-center justify-between p-4 rounded-3xl bg-[#141418] border border-zinc-800/80">
          <div>
            <div className="text-xs font-extrabold text-white">Live Telemetry</div>
            <div className="text-[11px] text-zinc-400">Stream metric updates in real-time</div>
          </div>
          <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
        </div>
      );

    case "button":
      return (
        <div className="w-full space-y-3 flex flex-col items-center">
          <div className="flex flex-wrap gap-2.5 items-center justify-center">
            <Button variant="default" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Button
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
      );

    case "button-group":
      return (
        <div className="w-full flex justify-center">
          <ButtonGroup>
            <Button
              size="xs"
              variant={btnGroupVal === "days" ? "default" : "ghost"}
              onClick={() => setBtnGroupVal("days")}
            >
              Days
            </Button>
            <Button
              size="xs"
              variant={btnGroupVal === "months" ? "default" : "ghost"}
              onClick={() => setBtnGroupVal("months")}
            >
              Months
            </Button>
            <Button
              size="xs"
              variant={btnGroupVal === "years" ? "default" : "ghost"}
              onClick={() => setBtnGroupVal("years")}
            >
              Years
            </Button>
          </ButtonGroup>
        </div>
      );

    case "checkbox":
      return (
        <div className="w-full space-y-3.5">
          <Checkbox
            checked={checkbox1}
            onCheckedChange={setCheckbox1}
            label="Automatic Replication"
            description="Sync ledger records across multi-region nodes."
          />
          <Checkbox
            checked={checkbox2}
            onCheckedChange={setCheckbox2}
            label="Hardware Enclave Authentication"
            description="Require physical security key on elevated transactions."
          />
        </div>
      );

    case "input":
      return (
        <div className="w-full space-y-3">
          <Input placeholder="Name" rightIcon={<Search className="h-4 w-4" />} />
          <Textarea placeholder="Message" />
        </div>
      );

    case "attachment":
      return (
        <div className="w-full space-y-2.5">
          <Attachment
            dropzone
            files={[
              { id: "1", name: "system-architecture.pdf", size: "1.8 MB", progress: 100 },
              { id: "2", name: "cluster-telemetry.csv", size: "420 KB", progress: 75 },
            ]}
            onRemove={(fId) =>
              toast({ title: "File Removed", description: `Attachment ${fId} unlinked.` })
            }
          />
        </div>
      );

    case "calendar":
      return (
        <div className="w-full flex justify-center">
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>
      );

    case "combobox":
      return (
        <div className="w-full space-y-1.5">
          <Label>Deployment Target</Label>
          <Combobox
            value={comboboxVal}
            onChange={setComboboxVal}
            options={[
              { value: "react", label: "react@19.0.0" },
              { value: "next", label: "next@15.1.0" },
              { value: "vite", label: "vite@6.1.0" },
              { value: "tailwind", label: "tailwindcss@3.4.17" },
            ]}
          />
        </div>
      );

    case "date-picker":
      return (
        <div className="w-full space-y-1.5">
          <Label>Scheduled Release Date</Label>
          <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
        </div>
      );

    case "field":
      return (
        <Field label="Domain Name" hint="Must have valid DNS records" required>
          <Input placeholder="app.ledger.internal" />
        </Field>
      );

    case "input-group":
      return (
        <div className="w-full">
          <InputGroup
            prefixAddon="https://"
            suffixAddon={<Button size="xs" variant="secondary">Ping</Button>}
          >
            <Input placeholder="api.service.internal" />
          </InputGroup>
        </div>
      );

    case "input-otp":
      return (
        <div className="w-full flex flex-col items-center gap-2.5">
          <span className="text-[11px] font-mono text-zinc-400">Enter Verification Code</span>
          <InputOTP length={6} value={otpVal} onChange={setOtpVal} />
        </div>
      );

    case "label":
      return (
        <div className="w-full space-y-2.5">
          <Label required>Organization API Key</Label>
          <Label optional>Cluster Alias</Label>
        </div>
      );

    case "native-select":
      return (
        <div className="w-full space-y-1.5">
          <Label>Select Region</Label>
          <NativeSelect defaultValue="us-east">
            <option value="us-east">US East (N. Virginia)</option>
            <option value="eu-central">EU Central (Frankfurt)</option>
            <option value="ap-south">AP South (Mumbai)</option>
          </NativeSelect>
        </div>
      );

    case "questionnaire":
      return (
        <div className="w-full flex justify-center">
          <Questionnaire
            steps={[
              {
                id: "q1",
                title: "Select database engine",
                description: "Choose optimal storage for your workload",
                options: [
                  { id: "pg", label: "PostgreSQL 16", description: "Relational ACID compliance" },
                  { id: "vector", label: "Qdrant Vector DB", description: "High-dimensional embeddings" },
                ],
              },
            ]}
            onComplete={(ans) =>
              toast({ title: "Survey Submitted", description: JSON.stringify(ans) })
            }
          />
        </div>
      );

    case "radio-group":
      return (
        <div className="w-full">
          <RadioGroup value={radioVal} onValueChange={setRadioVal}>
            <RadioGroupItem
              value="cluster-a"
              label="Compute Node Alpha"
              description="4 vCPUs, 16GB RAM, 100GB SSD"
            />
            <RadioGroupItem
              value="cluster-b"
              label="Compute Node Beta"
              description="16 vCPUs, 64GB RAM, 1TB NVMe"
            />
          </RadioGroup>
        </div>
      );

    case "select":
      return (
        <div className="w-full space-y-1.5">
          <Label>Deployment Tier</Label>
          <Select
            value={selectVal}
            onChange={setSelectVal}
            options={[
              { value: "starter", label: "Starter Tier", description: "Free for testing" },
              { value: "pro", label: "Pro Production", description: "High priority dispatch" },
              { value: "enterprise", label: "Enterprise Scale", description: "Dedicated cluster" },
            ]}
          />
        </div>
      );

    case "slider":
      return (
        <div className="w-full px-2">
          <Slider value={sliderVal} onChange={setSliderVal} min={0} max={100} />
        </div>
      );

    case "textarea":
      return (
        <Textarea
          placeholder="Enter system prompt instructions for autonomous agent..."
          maxLength={200}
          showCount
        />
      );

    case "toggle":
      return (
        <div className="w-full flex items-center justify-center">
          <Toggle pressed={toggleVal} onPressedChange={setToggleVal}>
            <Bold className="h-4 w-4 mr-1.5" /> Bold Formatting
          </Toggle>
        </div>
      );

    case "toggle-group":
      return (
        <div className="w-full flex justify-center">
          <ToggleGroup
            value={alignVal}
            onChange={setAlignVal}
            options={[
              { value: "left", label: "Left", icon: <AlignLeft className="h-3.5 w-3.5" /> },
              { value: "center", label: "Center", icon: <AlignCenter className="h-3.5 w-3.5" /> },
              { value: "right", label: "Right", icon: <AlignRight className="h-3.5 w-3.5" /> },
            ]}
          />
        </div>
      );

    default:
      return null;
  }
}
